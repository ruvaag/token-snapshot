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
import { CircularProgress, Link, Typography } from '@mui/material';
import config from '../utils/chainConfigs';

import getSnapshot from "../utils/getSnapshot";

export default function SnapshotTable({ input }) {
    const [snapshot, setSnapshot] = useState();
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        (async () => {
            setIsPending(true);
            setSnapshot(await getSnapshot(input?.chainId, input?.address, input?.date));
            setIsPending(false);
        })();
    }, [input?.chainId, input?.address, input?.date]);

    return (
        isPending ? <CircularProgress sx={{ m: '20px' }} /> :
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6'>Symbol</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Amount</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Price</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='h6'>Value</Typography>
                            </TableCell>
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
                                    <Link
                                        target="_blank"
                                        rel="noreferrer"
                                        href={config[input.chainId].explorerUrl(row.address)}
                                    >
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