import { times } from "lodash";
import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { Label, Loader, Segment } from "semantic-ui-react";
import styled from "styled-components";
import ImageWithFaceHighlighter from "./ImageWithFaceHighlighter";

const Images = ({ images, isLoading }) => (
    <ImagesContainer>
        <Loader active={isLoading} content="Ładowanie zdjęć..." inline="centered" />
        {images.map(({ name, src }, index) => (
            <Segment compact key={index} padded>
                <Label attached="bottom">{name}</Label>
                <ImageWithFaceHighlighter alt={name} src={src} />
            </Segment>
        ))}
    </ImagesContainer>
);

const ImagesContainer = styled.div`
    && {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: flex-start;
        & > * {
            margin: 0.5rem 0.75rem;
        }
    }
`;

const enhance = compose(
    withState("images", "setImages", []),
    withState("isLoading", "setLoading", false),
    withHandlers({
        fetchImages: ({setImages,setLoading}) => async () => {
            setLoading(true);
            const imagesPromises = times(32, index =>
                import(`./../../assets/images/image_${index}.png`)
            );
            const imagesSrcs = await Promise.all(imagesPromises);
            const images = imagesSrcs.map((src, index) => ({
                name: `image_${index}.png`,
                src
            }));
            setImages(images);
            setLoading(false);
        }
    }),
    lifecycle({
        async componentDidMount() {
            this.props.fetchImages()
        }
    })
);

export default enhance(Images);
