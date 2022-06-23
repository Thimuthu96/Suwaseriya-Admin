import React from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";

// component
import Button from "../components/Button";

const Filter = ({ filters, values, onChange, onSearch }) => {
  return (
    <div>
      <h6>
        Filter <FilterIcon />
      </h6>
      {filters.map(({ key, label, options, type, name }) => {
        if (type === "date") {
          return (
            <Grid key={key} item md={4} xs={2} mt={2}>
              <TextField
                style={{ width: "250px" }}
                type={type}
                variant="standard"
                value={values[name]}
                name={name}
                label={label}
                onChange={onChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          );
        }

        if (type === "select") {
          return (
            <Grid key={key} item md={4} xs={2} mt={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                  name={name}
                  label={label}
                  value={values[name]}
                  onChange={onChange}
                >
                  {options.map((item) => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          );
        }

        return (
          <Grid key={key} item md={4} xs={2}>
            <TextField
              type={type}
              value={values[name]}
              variant="standard"
              name={name}
              label={label}
              onChange={onChange}
              fullWidth
            />
          </Grid>
        );
      })}
      <Grid item md={12} xs={6}>
        <div>
          <Button label="Search" variant="text" onClick={onSearch} />
        </div>
      </Grid>
    </div>
  );
};

export default Filter;
