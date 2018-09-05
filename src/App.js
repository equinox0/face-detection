import React, { Component, Fragment } from "react";
import { Button, Divider, Dropdown, Image, Input, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { detect } from "./utils/viola-jones";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: undefined,
            imageSrc: undefined,
            isDetecting: false,
            result: undefined
        };
    }

    onAlgorithmChange = (event, { value: algorithm }) => {
        this.setState({ algorithm });
    };

    onOpenFile = ({ target }) => {
        const file = target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = ({ target }) => {
                this.setState({ imageSrc: target.result });
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageSrc: undefined });
        }
    };

    onStartDetection = async () => {
        this.setState({ isDetecting: true });
        const startTime = Date.now();
        const { detected } = await detect("#source-image");
        const time = Date.now() - startTime;
        this.setState({ isDetecting: false, result: { detected, time } });
    };

    render() {
        const { algorithm, imageSrc, isDetecting, result } = this.state;
        const isStartDisabled = !algorithm || !imageSrc || isDetecting;

        return (
            <Container>
                <Aside>
                    <Menu attached borderless fluid vertical>
                        <Menu.Item>
                            <Input
                                accept="image/*"
                                disabled={isDetecting}
                                fluid
                                onChange={this.onOpenFile}
                                type="file"
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
                                disabled={isDetecting}
                                fluid
                                onChange={this.onAlgorithmChange}
                                placeholder="Wybierz algorytm"
                                selection
                                options={[{ text: "Viola Jones", value: "violaJones" }]}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                content="Start"
                                disabled={isStartDisabled}
                                fluid
                                icon="eye"
                                labelPosition="left"
                                loading={isDetecting}
                                onClick={this.onStartDetection}
                                positive
                            />
                        </Menu.Item>
                        <Divider />
                        {result && (
                            <Fragment>
                                <Menu.Item header>Szykość działania</Menu.Item>
                                <Menu.Item>{`${result.time}ms`}</Menu.Item>
                                <Menu.Item header>Klatki / sekundę</Menu.Item>
                                <Menu.Item>{`${result.time * 60}fps`}</Menu.Item>
                                <Menu.Item header>Wykryto twarz</Menu.Item>
                                <Menu.Item>{result.detected ? "Tak" : "Nie"}</Menu.Item>
                            </Fragment>
                        )}
                    </Menu>
                </Aside>
                <Main>
                    {imageSrc && (
                        <Image
                            alt="Obraz źródłowy"
                            centered
                            id="source-image"
                            src={imageSrc}
                            size="large"
                            bordered
                        />
                    )}
                </Main>
            </Container>
        );
    }
}

const Container = styled.div`
    bottom: 0;
    display: flex;
    left: 0;
    top: 0;
    position: fixed;
    right: 0;
`;

const Aside = styled.aside`
    flex-basis: 300px;
    width: 300px;

    & > .menu {
        height: 100%;
    }
`;

const Main = styled.main`
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: center;
`;

export default App;
