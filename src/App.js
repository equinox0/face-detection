import React, { Component } from "react";
import { Redirect, NavLink, Route, Switch } from "react-router-dom";
import { Container, Dropdown, Grid, Menu, Segment } from "semantic-ui-react";
import { Images, Results } from "./components";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAlgorithm: undefined
        };
    }

    handleSelectAlgorithm = (e, { value: selectedAlgorithm }) =>
        this.setState({ selectedAlgorithm });

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Menu attached>
                            <Menu.Item header>Alicja Zelewska</Menu.Item>
                            <Menu.Item>
                                <Dropdown
                                    onChange={this.handleSelectAlgorithm}
                                    options={[
                                        { text: "Haar", value: "haar" },
                                        { text: "LBP", value: "lbp" },
                                        { text: "HOG", value: "hog" }
                                    ]}
                                    placeholder="Wybierz algorytm"
                                    selection
                                    value={this.state.selectedAlgorithm}
                                />
                            </Menu.Item>
                            <Menu.Menu position="right">
                                <Menu.Item as={NavLink} to="/wyniki">
                                    Wyniki
                                </Menu.Item>
                                <Menu.Item as={NavLink} to="/zdjecia">
                                    Zdjęcia
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Container as={Segment}>
                            <Switch>
                                <Route
                                    path="/wyniki"
                                    render={routeProps => (
                                        <Results
                                            {...routeProps}
                                            algorithm={this.state.selectedAlgorithm}
                                        />
                                    )}
                                />
                                <Route
                                    path="/zdjecia"
                                    render={routeProps => (
                                        <Images
                                            {...routeProps}
                                            algorithm={this.state.selectedAlgorithm}
                                        />
                                    )}
                                />
                                <Redirect to="/wyniki" />
                            </Switch>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
