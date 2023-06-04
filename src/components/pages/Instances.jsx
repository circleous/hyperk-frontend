import * as React from "react";

import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import DataGrid from "react-data-grid";
import { useLocation, useLoaderData } from "react-router-dom";
import { User, ExternalLink } from "react-feather";

import { getInstanceDetail } from "../../services/instances";

import "react-data-grid/lib/styles.css";
import "../rdg-joy.css";

const UserIcon = <User size={16} />;

function nameCellFormatter(props) {
  return (
    <Box
      onClick={(e) => {
        e.preventDefault();
        window.location.hash = props.row.id;
      }}
      sx={{
        textDecoration: "none",
        color: "inherit",
        alignItems: "center",
        flexDirection: "row",
        display: "flex",
      }}
    >
      {props.row.name}
      <ExternalLink
        size={16}
        color="var(--joy-palette-primary-softColor)"
        style={{
          marginLeft: "1.5pt",
        }}
      />
    </Box>
  );
}

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

const columns = [
  { key: "name", name: "Name", formatter: nameCellFormatter },
  { key: "vcpu", name: "vCPU", sortable: true },
  { key: "ram", name: "RAM", sortable: true },
  { key: "state", name: "State" },
  { key: "ip", name: "IP" },
  { key: "owner", name: "Owner", formatter: ownerCellFormatter },
];

// const rows = [
//   { id: 0, name: "Example", vcpu: 0.9, ram: "4GB", owner: "arya" },
//   { id: 1, name: "Demo", vcpu: 0.8, ram: "4GB", owner: "arya" },
//   { id: 2, name: "daming-lab-cs201", vcpu: 4, ram: "8GB", owner: "admin" },
// ];

function InstanceDetail({ instance }) {
  const { id, name, vcpu, ram, state } = instance;

  return (
    <React.Fragment>
      <Typography>{id}</Typography>
      <Typography>{name}</Typography>
      <Typography>{vcpu}</Typography>
      <Typography>{ram}</Typography>
      <Typography>{state}</Typography>
    </React.Fragment>
  );
}

export default function Instances() {
  const [sortColumns, setSortColumns] = React.useState([]);
  // const [selectedRow, setSelectedRow] = React.useState(new Set());
  const [instanceDetail, setInstanceDetail] = React.useState({});

  const { data } = useLoaderData();
  const { mode } = useColorScheme();
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash)
      getInstanceDetail(hash.slice(1))
        .then(setInstanceDetail)
        .catch(console.log);
  }, [hash]);

  const rowKeyGetter = (row) => row.id;
  const onSortColumnsChange = (newSortColumns) =>
    setSortColumns(newSortColumns);
  const onSelectedRowsChange = (newSelectedRows) => {
    if (newSelectedRows.length !== 0) {
      window.location.hash = newSelectedRows[0].row.id;
    }
  };

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
        // selectedRows={[selectedRow]}
        onSelectedRowsChange={onSelectedRowsChange}
        onSortColumnsChange={onSortColumnsChange}
      />

      <Sheet
        variant="outlined"
        sx={{
          marginTop: 1,
          height: "50%",
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        <InstanceDetail instance={instanceDetail} />
      </Sheet>
    </Sheet>
  );
}
