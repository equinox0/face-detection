import { times } from "lodash";
import React from "react";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { Label, Loader, Segment } from "semantic-ui-react";
import styled from "styled-components";
import FaceImage from "./FaceImage";

const Images = ({ images, isLoading }) => (
    <ImagesContainer>
        <Loader active={isLoading} content="Ładowanie zdjęć..." inline="centered" />
        {images.map(({ coordinates, name, size, src }, index) => (
            <Segment compact key={index} padded>
                <Label attached="bottom">{name}</Label>
                <FaceImage alt={name} coordinates={coordinates} size={size} src={src} />
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
    withState("baseImages", "setBaseImages", []),
    withState("images", "setImages", []),
    withState("isLoading", "setLoading", false),
    withHandlers({
        fetchBaseImages: ({ setBaseImages, setImages, setLoading }) => async () => {
            setLoading(true);
            const imagesPromises = times(32, index =>
                import(`./../../assets/images/image_${index}.png`)
            );
            const imagesSrcs = await Promise.all(imagesPromises);
            const images = imagesSrcs.map((src, index) => ({
                name: `image_${index}.png`,
                src
            }));
            setBaseImages(images);
            setImages(images);
            setLoading(false);
        },
        onResultsChange: ({ baseImages, results, setImages }) => () => {
            const newImages = baseImages.map(image => {
                const resultWithDetection = results.find(
                    ({ detected, path }) => path === image.name && detected.length > 0
                );
                return resultWithDetection !== undefined
                    ? {
                          ...image,
                          coordinates: {
                              x: resultWithDetection.detected[0].x,
                              y: resultWithDetection.detected[0].y
                          },
                          size: {
                              w: resultWithDetection.detected[0].w,
                              h: resultWithDetection.detected[0].h
                          }
                      }
                    : image;
            });
            setImages(newImages);
        }
    }),
    lifecycle({
        async componentDidMount() {
            this.props.fetchBaseImages();
        },
        async componentDidUpdate({ results: prevResults }) {
            if (prevResults !== this.props.results) {
                this.props.onResultsChange();
            }
        }
    })
);

export default enhance(Images);
