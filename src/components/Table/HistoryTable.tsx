import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { HistoryRound, UserChoose } from '../../types/Memory';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import _ from 'lodash';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Tooltip } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

interface RowProps {
    row: HistoryRound;
}
const RenderAnswer = ({ chooses, idChoose }: { chooses: UserChoose[]; idChoose: number }) => {
    if (chooses.length == 0) {
        return <TableCell align="right">NOT</TableCell>;
    } else {
        if (chooses[idChoose].uc1 && chooses[idChoose].uc2) {
            if (chooses[idChoose].uc1.id == chooses[idChoose].uc2.id) {
                return (
                    <TableCell align="right">
                        <p className="text-sm font-bold text-green-500">{chooses[idChoose].uc1.name}</p>
                    </TableCell>
                );
            } else {
                return (
                    <TableCell align="right">
                        <div className="flex flex-col">
                            <p>{chooses[idChoose].uc1.name}</p>
                            <p className="text-sm font-bold text-red-300">{chooses[idChoose].uc2.name}</p>
                        </div>
                    </TableCell>
                );
            }
        } else {
            return <TableCell align="right">NOT INFO</TableCell>;
        }
    }
};

function Row({ row }: RowProps) {
    const [open, setOpen] = React.useState(false);
    const { playHistory } = useSelector((state: RootState) => state.memory);

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    backgroundColor:
                        row.no == playHistory.length
                            ? '#0000001f'
                            : row.no == playHistory[0]?.no
                            ? '#339f33'
                            : 'inherit',
                }}
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.no}
                </TableCell>
                <TableCell align="right">{row.totalCore}</TableCell>
                <TableCell align="right">{row.toTalTime}</TableCell>
                <TableCell align="right">
                    {row.no == playHistory[0]?.no && (
                        <Tooltip title="Your best round">
                            <MilitaryTechIcon></MilitaryTechIcon>
                        </Tooltip>
                    )}
                    {row.no == playHistory.length && (
                        <Tooltip title="Your last round">
                            <MyLocationIcon></MyLocationIcon>
                        </Tooltip>
                    )}

                </TableCell>
                <TableCell align="right">{row.day}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Level</TableCell>
                                        <TableCell>Core</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                        <TableCell align="right">Answers 1</TableCell>
                                        <TableCell align="right">Answers 2</TableCell>
                                        <TableCell align="right">Answers 3</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.round.map((historyRow) => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.id}
                                            </TableCell>
                                            <TableCell>{historyRow.core}</TableCell>
                                            <TableCell align="right">{30 - historyRow.time}s</TableCell>
                                            {<RenderAnswer chooses={historyRow.choose} idChoose={0}></RenderAnswer>}
                                            {<RenderAnswer chooses={historyRow.choose} idChoose={1}></RenderAnswer>}
                                            {<RenderAnswer chooses={historyRow.choose} idChoose={2}></RenderAnswer>}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function HistoryTable() {
    const { playHistory } = useSelector((state: RootState) => state.memory);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>No.</TableCell>
                        <TableCell align="right">Total core</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">TOP</TableCell>
                        <TableCell align="right">Day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playHistory.map((his, index) => (
                        <Row key={index} row={his} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
