import React from "react";
import { compose, withHandlers, withProps, withState } from "recompose";
import { Dropdown, Grid, Message } from "semantic-ui-react";
import ResultsTable from "./ResultsTable";

const Results = ({ algorithms, onChangeAlgorithm, results, selectedAlgorithm }) => (
    <Grid>
        <Grid.Row>
            <Grid.Column>
                <Dropdown
                    onChange={onChangeAlgorithm}
                    options={algorithms}
                    placeholder="Wybierz algorytm"
                    selection
                    value={selectedAlgorithm}
                />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                {selectedAlgorithm ? (
                    <ResultsTable results={results} />
                ) : (
                    <Message
                        content="Wybierz algorytm z listy, aby wyświetlić wyniki pomiarów."
                        icon="help"
                    />
                )}
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

const enhance = compose(
    withState("selectedAlgorithm", "setSelectedAlgorithm", undefined),
    withState("results", "setResults", []),
    withProps({
        algorithms: [
            { text: "Haar", value: "haar" },
            { text: "LBP", value: "lbp" },
            { text: "HOG", value: "hog" }
        ]
    }),
    withHandlers({
        onChangeAlgorithm: ({ setResults, setSelectedAlgorithm }) => async (e, { value }) => {
            setSelectedAlgorithm(value);
            const results = await import(`./../../assets/results/${value}-results.json`);
            setResults(results);
        }
    })
);

export default enhance(Results);
