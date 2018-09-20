import React from "react";
import { compose, lifecycle,  withState, withHandlers } from "recompose";
import { Grid, Message } from "semantic-ui-react";
import ResultsTable from "./ResultsTable";

const Results = ({ results }) => (
    <Grid>
        <Grid.Row>
            <Grid.Column>
                {results.length > 0 ? (
                    <ResultsTable results={results} />
                ) : (
                    <Message
                        header="Brak wyników"
                        content="W celu wyświetlenia wyników należy wybrać algorytm z listy w nagłówku strony"
                        icon="help"
                    />
                )}
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

const enhance = compose(
    withState("results", "setResults", []),
    withHandlers({
        fetchResults: ({ algorithm, setResults }) => async () => {
            try {
                const results = await import(`./../../assets/results/${algorithm}-results.json`);
                setResults(results);
            } catch (error) {
                console.error(error);
            }
        }
    }),
    lifecycle({
        componentDidMount() {
            if(this.props.algorithm) {
                this.props.fetchResults()
            }
        },
        componentDidUpdate(prevProps) {
            if (prevProps.algorithm !== this.props.algorithm) {
                this.props.fetchResults()
            }
        }
    })
);

export default enhance(Results);
