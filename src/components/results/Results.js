import React from "react";
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

export default Results;
