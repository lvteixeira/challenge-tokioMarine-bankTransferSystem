export default function TableRow(props) {
    let rows = [];

    props.statements.forEach((statement, index) => {
        rows.push(
            <tr id={index}>
                <td>{statement.id}</td>
                <td>{statement.sourceAccount}</td>
                <td>{statement.destinationAccount}</td>
                <td>R$ {statement.amount}</td>
                <td>R$ {statement.fee}</td>
                <td>{statement.scheduleDate}</td>
                <td>{statement.dateToTransfer}</td>
            </tr>
        );
    });

    return <>{rows}</>;
}