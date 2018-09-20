import React from "react";
import { Redirect, NavLink, Route, Switch } from "react-router-dom";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { Container, Dropdown, Grid, Menu, Segment } from "semantic-ui-react";
import { Images, Results } from "./components";

const App = ({ algorithm, onAlgorithmChange, results }) => (
    <Grid>
        <Grid.Row>
            <Grid.Column>
                <Menu attached>
                    <Menu.Item header>Alicja Zelewska</Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            onChange={onAlgorithmChange}
                            options={[
                                { text: "Haar", value: "haar" },
                                { text: "LBP", value: "lbp" },
                                { text: "HOG", value: "hog" }
                            ]}
                            placeholder="Wybierz algorytm"
                            selection
                            value={algorithm}
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
                            render={routeProps => <Results {...routeProps} results={results} />}
                        />
                        <Route
                            path="/zdjecia"
                            render={routeProps => <Images {...routeProps} results={results} />}
                        />
                        <Redirect to="/wyniki" />
                    </Switch>
                </Container>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

const enhance = compose(
    withState("results", "setResults", []),
    withState("algorithm", "setAlgorithm", undefined),
    withHandlers({
        fetchResults: ({ algorithm, setResults }) => async () => {
            try {
                const results = await import(`./assets/results/${algorithm}-results.json`);
                setResults(results);
            } catch (error) {
                console.error(error);
            }
        },
        onAlgorithmChange: ({ setAlgorithm }) => (e, { value }) => {
            setAlgorithm(value);
        }
    }),
    lifecycle({
        componentDidMount() {
            if (this.props.algorithm) {
                this.props.fetchResults();
            }
        },
        componentDidUpdate(prevProps) {
            if (prevProps.algorithm !== this.props.algorithm) {
                this.props.fetchResults();
            }
        }
    })
);

export default enhance(App);
