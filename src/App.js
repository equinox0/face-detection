import React, { Component } from "react";
import { Button, Divider, Dropdown, Image, Input, Menu } from "semantic-ui-react";
import styled from "styled-components";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: undefined,
            imageSrc: undefined
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

    onStartDetection = () => {
        alert("starting detection");
    };

    render() {
        const { algorithm, imageSrc } = this.state;
        const isStartDisabled = !algorithm || !imageSrc;

        return (
            <Container>
                <Aside>
                    <Menu attached borderless fluid vertical>
                        <Menu.Item>
                            <Input accept="image/*" fluid onChange={this.onOpenFile} type="file" />
                        </Menu.Item>
                        <Menu.Item>
                            <Dropdown
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
                                onClick={this.onStartDetection}
                                positive
                            />
                        </Menu.Item>
                        <Divider />
                        <Menu.Item header>Szykość działania</Menu.Item>
                        <Menu.Item>200ms</Menu.Item>
                        <Menu.Item header>Klatki / sekundę</Menu.Item>
                        <Menu.Item>
                            {200 * 60}
                            fps
                        </Menu.Item>
                        <Menu.Item header>Wykryto twarz</Menu.Item>
                        <Menu.Item>Tak</Menu.Item>
                    </Menu>
                </Aside>
                <Main>
                    {imageSrc && (
                        <Image
                            alt="Obraz źródłowy"
                            centered
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
