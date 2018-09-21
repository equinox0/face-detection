import { isEqual } from "lodash";
import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import styled from "styled-components";

const ImageWithFaceHighlighter = ({ alt, imageRef, setCanvasRef, setImageRef, src }) => (
    <Wrapper>
        <img alt={alt} className="ui image" ref={setImageRef} src={src} />
        <canvas
            height={imageRef ? imageRef.height : undefined}
            ref={setCanvasRef}
            width={imageRef ? imageRef.width : undefined}
        />
    </Wrapper>
);

const Wrapper = styled.div`
    height: 100%;
    position: relative;
    width: 100%;

    & > * {
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        width: 100%;
    }
`;

const enhance = compose(
    withState("canvasRef", "setCanvasRef", undefined),
    withState("imageRef", "setImageRef", undefined),
    withHandlers({
        handleDrawRectangle: ({ canvasRef, detectedFaces }) => () => {
            if (canvasRef) {
                const context = canvasRef.getContext("2d");
                context.clearRect(0, 0, canvasRef.width, canvasRef.height);
                if (detectedFaces) {
                    detectedFaces.forEach(detectedFace =>
                        drawFaceRectOnContext(context, detectedFace)
                    );
                }
            }
        }
    }),
    lifecycle({
        componentDidUpdate({ detectedFaces: prevDetectedFaces }) {
            if (!isEqual(this.props.detectedFaces, prevDetectedFaces)) {
                this.props.handleDrawRectangle();
            }
        }
    })
);

const drawFaceRectOnContext = (context, { x, y, w, h }) => {
    context.strokeStyle = "#00FF00";
    context.lineWidth = 2;
    context.translate(0, 0);
    context.strokeRect(x, y, w, h);
};

export default enhance(ImageWithFaceHighlighter);
