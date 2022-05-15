import moment from 'moment';
import { Container } from "@mui/material";
import Divider from '@mui/material/Divider';

export default function SectionDivider({ input }) {
    return (
        <Container>
            <p>
                Snapshot for <b>{input?.address ?? 'Invalid Address'}</b>&nbsp;
                on <b>{input?.chainName ?? 'Invalid Chain'}</b> as of&nbsp;
                <b>{moment.unix(input?.date).format("dddd, MMMM Do YYYY")}</b>
            </p>
            <Divider sx={{ my: '2px' }} />
        </Container>
    )
}