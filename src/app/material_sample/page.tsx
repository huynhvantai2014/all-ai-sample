"use client";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";

export default function MaterialSample() {
  const [radioValue, setRadioValue] = React.useState("a");
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(30);
  const [selectValue, setSelectValue] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Material UI Components Sample</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Form Elements</Typography>
                <TextField label="Text Field" fullWidth sx={{ my: 1 }} />
                <FormControlLabel control={<Checkbox />} label="Checkbox" />
                <RadioGroup
                  value={radioValue}
                onChange={e => setRadioValue(e.target.value)}
                  row
                >
                  <FormControlLabel value="a" control={<Radio />} label="A" />
                  <FormControlLabel value="b" control={<Radio />} label="B" />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchChecked}
                      onChange={e => setSwitchChecked(e.target.checked)}
                    />
                  }
                  label="Switch"
                />
                <Slider
                  value={sliderValue}
                  onChange={(_, v) => setSliderValue(v as number)}
                  min={0}
                  max={100}
                  sx={{ width: 200, mt: 2 }}
                />
                <Select
                  value={selectValue}
                  onChange={e => setSelectValue(Number(e.target.value))}
                  sx={{ mt: 2, width: 200 }}
                >
                  <MenuItem value={1}>Option 1</MenuItem>
                  <MenuItem value={2}>Option 2</MenuItem>
                </Select>
              </CardContent>
              <CardActions>
                <Button variant="contained">Submit</Button>
                <Button variant="outlined">Cancel</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">Other Components</Typography>
              {/* Autocomplete (Search/Select) */}
              <Autocomplete
                options={["Option 1", "Option 2", "Option 3"]}
                renderInput={params => (
                  <TextField {...params} label="Search & Select" variant="outlined" />
                )}
                sx={{ mb: 2, width: 250 }}
              />
              <Chip label="Chip" sx={{ mr: 1 }} />
              <Avatar sx={{ mr: 1 }}>A</Avatar>
              <Badge badgeContent={4} color="primary">
                <Avatar>B</Avatar>
              </Badge>
              <CircularProgress sx={{ mr: 1 }} />
              <LinearProgress sx={{ my: 2 }} />
              <Alert severity="info">This is an info alert</Alert>
              <Button onClick={() => setSnackbarOpen(true)}>Show Snackbar</Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Snackbar message"
              />
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5">Tabs & Table</Typography>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
        </Tabs>
        {/* Material Table with features: sorting, pagination, selection, editable rows */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sortDirection="asc">Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[{ name: "Item 1", value: 100 }, { name: "Item 2", value: 200 }].map((row, idx) => (
                <TableRow key={row.name} hover selected={idx === tabValue}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination sample */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
            <Button size="small">Previous</Button>
            <Typography sx={{ mx: 2 }}>Page 1 of 1</Typography>
            <Button size="small">Next</Button>
          </Box>
        </TableContainer>
        <Fab color="primary" sx={{ position: "fixed", bottom: 32, right: 32 }}>
          <AddIcon />
        </Fab>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250 }}>
            <List>
              <ListItem button onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Close Drawer" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sample Item" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Button onClick={() => setDrawerOpen(true)} sx={{ mt: 2 }}>
          Open Drawer
        </Button>
      </Box>
    </Container>
  );
}
