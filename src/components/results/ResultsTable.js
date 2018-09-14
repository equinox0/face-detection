import React from "react";
import { withProps } from "recompose";
import { Table } from "semantic-ui-react";

const ResultsTable = ({ results, statistics }) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Nazwa</Table.HeaderCell>
                <Table.HeaderCell>Szybkość</Table.HeaderCell>
                <Table.HeaderCell>Fps</Table.HeaderCell>
                <Table.HeaderCell>Wykryto twarz</Table.HeaderCell>
                <Table.HeaderCell>Współrzędne [x, y, w, h]</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {results.map((result, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{result.path}</Table.Cell>
                    <Table.Cell>{`${Number(result.time).toFixed(2)}ms`}</Table.Cell>
                    <Table.Cell>{`${Math.round(result.time) * 6}fps`}</Table.Cell>
                    <Table.Cell>{result.detected.length > 0 ? "Tak" : "Nie"}</Table.Cell>
                    <Table.Cell>
                        {result.detected.map(({ x, y, w, h }, index) => (
                            <div key={index}>[{`${x}, ${y}, ${w}, ${h}`}]</div>
                        ))}
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell>Średnie statystyki:</Table.HeaderCell>
                <Table.HeaderCell>{`${statistics.time}ms`}</Table.HeaderCell>
                <Table.HeaderCell>{`${statistics.fps}fps`}</Table.HeaderCell>
                <Table.HeaderCell>
                    {statistics.totalDetected}/{results.length}
                </Table.HeaderCell>
                <Table.HeaderCell>{`${statistics.totalDetectedPercentage}%`}</Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
);

const enhance = withProps(({ results }) => {
    const totalDetected = results.filter(({ detected }) => detected.length > 0).length;
    return {
        statistics: {
            fps:
                results
                    .map(({ time }) => Math.round(time) * 6)
                    .reduce((acc, value) => acc + value, 0) / results.length,
            time: Number(
                results.map(({ time }) => Number(time)).reduce((acc, value) => acc + value, 0) /
                    results.length
            ).toFixed(2),
            totalDetected,
            totalDetectedPercentage: ((totalDetected / results.length) * 100).toFixed(2)
        }
    };
});

export default enhance(ResultsTable);
