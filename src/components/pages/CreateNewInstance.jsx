import * as React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Slider from "@mui/joy/Slider";
import Typography from "@mui/joy/Typography";

import { Layers } from "react-feather";

import { createInstance } from "../../services/instances";

export default function CreateNewInstance() {
  const [name, setName] = React.useState("");
  const [vcpu, setVCpu] = React.useState(1);
  const [diskSize, setDiskSize] = React.useState(8);
  const [ram, setRam] = React.useState(1);
  const [ramUnit, setRamUnit] = React.useState("MiB");
  const [os, setOS] = React.useState("");
  const [rootPassword, setRootPassword] = React.useState("");
  const [rootPassword2, setRootPassword2] = React.useState("");
  const [hostname, setHostname] = React.useState("");

  const [samePassword, setSamePassword] = React.useState(true);
  const [sizeError, setSizeError] = React.useState(false);

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
        Creata New Instance
      </Typography>

      <Box
        sx={{
          pt: 3,
          pb: 10,
          display: "grid",
          gridTemplateColumns: {
            xs: "100%",
            sm: "minmax(120px, 30%) 1fr",
            lg: "280px 1fr minmax(120px, 208px)",
          },
          columnGap: { xs: 2, sm: 3, md: 4 },
          rowGap: { xs: 2, sm: 2.5 },
          "& > hr": {
            gridColumn: "1/-1",
          },
        }}
      >
        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>OS</FormLabel>
          <RadioGroup
            overlay
            name="member"
            defaultValue="ubuntu-20.04"
            orientation="horizontal"
            sx={{ gap: 2, mt: 1 }}
            value={os}
            onChange={(e) => setOS(e.target.value)}
          >
            {["ubuntu-20.04", "ubuntu-22.04", "debian-11"].map((val) => (
              <Sheet
                component="label"
                key={val}
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "sm",
                  borderRadius: "md",
                  bgcolor: "background.body",
                  minWidth: "100px",
                  gap: 1.5,
                }}
              >
                <Radio
                  value={`${val}`}
                  sx={{
                    mt: -1,
                    mr: -1,
                    mb: 0.5,
                    alignSelf: "flex-end",
                    "--Radio-actionRadius": (theme) => theme.vars.radius.md,
                  }}
                />
                <Typography level="body2">{val.replace("-", " ")}</Typography>
              </Sheet>
            ))}
          </RadioGroup>
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <Box>
            <FormLabel>Disk Size</FormLabel>
            <FormHelperText>min 8GB, max 128GB</FormHelperText>
          </Box>
          <Input
            value={diskSize}
            error={sizeError}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setDiskSize(val);
              setSizeError(0 + val > 128 || 0 + val < 8);
            }}
            endDecorator={<Typography>GB</Typography>}
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>vCPU</FormLabel>
          <Slider
            value={vcpu}
            marks={[
              {
                value: 1,
                label: "1",
              },
              {
                value: 2,
                label: "2",
              },
              {
                value: 3,
                label: "3",
              },
              {
                value: 4,
                label: "4",
              },
            ]}
            step={1}
            min={1}
            max={4}
            defaultValue={1}
            orientation="horizontal"
            valueLabelDisplay="on"
            variant="solid"
            onChangeCommitted={(e, v) => setVCpu(v)}
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>RAM</FormLabel>
          <Input
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            startDecorator={<Layers />}
            endDecorator={
              <FormControl>
                <Divider orientation="vertical" />
                <Select
                  variant="plain"
                  value={ramUnit}
                  onChange={(_, value) => setRamUnit(value)}
                  sx={{ mr: -1.5, "&:hover": { bgcolor: "transparent" } }}
                >
                  <Option value="KiB">KiB</Option>
                  <Option value="MiB">MiB</Option>
                  <Option value="GiB">GiB</Option>
                </Select>
              </FormControl>
            }
            sx={{ width: 300 }}
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Root Password</FormLabel>
          <Input
            type="password"
            value={rootPassword}
            error={!samePassword}
            onChange={(e) => {
              setRootPassword(e.target.value);
              setSamePassword(rootPassword2 == e.target.value);
            }}
          />
        </FormControl>

        <Divider />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Re-Type Root Password</FormLabel>
          <Input
            type="password"
            value={rootPassword2}
            error={!samePassword}
            onChange={(e) => {
              setRootPassword2(e.target.value);
              setSamePassword(e.target.value == rootPassword);
            }}
          />
        </FormControl>

        <Divider role="presentation" />

        <FormControl sx={{ display: { sm: "contents" } }}>
          <FormLabel>Hostname</FormLabel>
          <Input
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
          />
        </FormControl>
        <Box
          sx={{
            gridColumn: "1/-1",
            justifySelf: "flex-end",
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="outlined" color="neutral" size="sm">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              createInstance({
                name,
                os,
                vcpu,
                size: diskSize,
                ram,
                ram_unit: ramUnit,
                root_password: rootPassword,
                hostname,
              })
                .then(console.log)
                .catch(console.log);
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
}
