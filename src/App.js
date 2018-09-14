import React, { Component } from "react";
import { Container, Grid, Menu, Segment } from "semantic-ui-react";
import { Images, Results } from "./components";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "images"
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached>
                            <Menu.Item header>Alicja Zelewska</Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item
                                    name="results"
                                    active={this.state.activeItem === "results"}
                                    onClick={this.handleItemClick}
                                >
                                    Wyniki
                                </Menu.Item>
                                <Menu.Item
                                    name="images"
                                    active={this.state.activeItem === "images"}
                                    onClick={this.handleItemClick}
                                >
                                    Zdjęcia
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Container as={Segment}>
                            {this.state.activeItem === "results" && <Results />}
                            {this.state.activeItem === "images" && <Images />}
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
