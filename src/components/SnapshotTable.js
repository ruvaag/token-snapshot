import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { CircularProgress, Link } from '@mui/material';
import getSnapshot from "../utils/getSnapshot";

export default function SnapshotTable({ input }) {
    const [snapshot, setSnapshot] = useState();
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        (async () => {
            setIsPending(true);
            setSnapshot(await getSnapshot(input?.address, input?.date));
            setIsPending(false);
        })();
    }, [input?.address, input?.date]);

    const ETHERSCAN = "https://etherscan.io/token/";

    return (
        isPending ? <CircularProgress sx={{ m: '20px' }} /> :
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {snapshot && snapshot.map((row) => (
                            <TableRow
                                key={row.address}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.symbol}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.balance.toString().toLocaleString("en-US")}</TableCell>
                                <TableCell>
                                    {row.price ? `$ ${row.price.toLocaleString("en-US")}` : "NA"}
                                </TableCell>
                                <TableCell>
                                    {row.value ? `$ ${row.value.toLocaleString("en-US")}` : "NA"}
                                </TableCell>
                                <TableCell>
                                    <Link href={ETHERSCAN + row.address}
                                        target="_blank"
                                        rel="noreferrer">
                                        <CallMadeIcon fontSize='medium' />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}