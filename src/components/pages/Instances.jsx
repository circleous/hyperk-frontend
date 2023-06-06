import * as React from "react";

import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import DataGrid, { SelectColumn } from "react-data-grid";
import { useLoaderData } from "react-router-dom";
import { User, Play, Power, Pause } from "react-feather";

import { getInstanceDetail, updateState } from "../../services/instances";

import "react-data-grid/lib/styles.css";
import "../rdg-joy.css";

const UserIcon = <User size={16} />;

function ownerCellFormatter(props) {
  return (
    <Box
      sx={{
        lineHeight: "normal",
        height: "100%",
        flex: 1,
        verticalAlign: "middle",
      }}
    >
      <Chip variant="soft" startDecorator={UserIcon} sx={{ marginY: "9px" }}>
        {/* {props.row.owner} */}
        admin
      </Chip>
    </Box>
  );
}

function ramCellFormatter(props) {
  return <React.Fragment>{Math.floor(props.row.ram / 1024)} MB</React.Fragment>;
}

const columns = [
  SelectColumn,
  { key: "name", name: "Name" },
  { key: "vcpu", name: "vCPU", sortable: true },
  { key: "ram", name: "RAM", sortable: true, formatter: ramCellFormatter },
  { key: "state", name: "State" },
  { key: "ip", name: "IP" },
  { key: "owner", name: "Owner", formatter: ownerCellFormatter },
];

// const rows = [
//   { id: 0, name: "Example", vcpu: 0.9, ram: "4GB", owner: "arya" },
//   { id: 1, name: "Demo", vcpu: 0.8, ram: "4GB", owner: "arya" },
//   { id: 2, name: "daming-lab-cs201", vcpu: 4, ram: "8GB", owner: "admin" },
// ];

function InstanceDetail({ instanceId }) {
  const [detail, setDetail] = React.useState({});

  React.useEffect(() => {
    if (!instanceId) return;

    getInstanceDetail(instanceId).then(setDetail).catch(console.log);
  }, [instanceId]);

  const handleUpdate = React.useCallback(
    (state) => {
      updateState(instanceId, state)
        .then(console.log)
        .catch(console.log)
        .finally(() => window.location.reload());
    },
    [instanceId]
  );

  if (!instanceId) {
    return <React.Fragment />;
  }

  return (
    <Grid container spacing={2} sx={{ mx: 1, my: 1, height: "100%" }}>
      <Grid xs={12} sm={6}>
        <Card
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "var(--joy-palette-background-level1)",
          }}
        >
          <CardContent>
            <Typography level="body3">{detail.id}</Typography>
            <Typography fontWeight="xl">{detail.name}</Typography>
            <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
              IP:{" "}
              <Typography variant="soft" color="info">
                {detail.ip || "NOT RUNNING"}
              </Typography>
            </Typography>

            <Button
              sx={{ my: 1 }}
              color="success"
              disabled={detail.ip !== ""}
              onClick={() => handleUpdate("start")}
              startDecorator={<Play size={14} />}
            >
              START
            </Button>
            <Button
              sx={{ my: 1 }}
              color="danger"
              disabled={detail.ip === ""}
              onClick={() => handleUpdate("poweroff")}
              startDecorator={<Power size={14} />}
            >
              POWEROFF
            </Button>
            <Button
              sx={{ my: 1 }}
              color="warning"
              disabled={detail.ip === ""}
              onClick={() => handleUpdate("pause")}
              startDecorator={<Pause size={14} />}
            >
              PAUSE
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Grid xs={12} sx={{ mb: 1 }}>
          <Card
            sx={{
              width: "100%",
              height: "240px",
              backgroundColor: "var(--joy-palette-background-level1)",
            }}
          >
            <CardContent>
              RAM Usage (??/{Math.floor(detail.ram / 1024)}MB)
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card
            sx={{
              width: "100%",
              height: "240px",
              backgroundColor: "var(--joy-palette-background-level1)",
            }}
          >
            <CardContent>CPU Usage ({detail.vcpu} vCPU) (??%)</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Instances() {
  const [sortColumns, setSortColumns] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState(() => new Set());

  const { data } = useLoaderData();
  const { mode } = useColorScheme();

  const rowKeyGetter = (row) => row.id;
  const onSortColumnsChange = (newSortColumns) =>
    setSortColumns(newSortColumns);

  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        Instances
      </Typography>

      <DataGrid
        className={`rdg-joy-${mode}`}
        columns={columns}
        sortColumns={sortColumns}
        rows={data?.instances}
        rowKeyGetter={rowKeyGetter}
        rowHeight={50}
        selectedRows={selectedRows}
        onSelectedRowsChange={(newSelectedRows) => {
          let last;
          newSelectedRows.forEach((k) => (last = k));
          setSelectedRows(new Set([last]));
        }}
        onSortColumnsChange={onSortColumnsChange}
      />

      <Sheet
        variant="outlined"
        sx={{
          my: 2,
          minHeight: "450px",
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        <InstanceDetail instanceId={selectedRows.values().next().value} />
      </Sheet>
    </Sheet>
  );
}
