import { FC, SyntheticEvent } from "react";
import { Autocomplete } from "@mui/material";
import { useRouter } from "next/navigation";

import { FindCityResponse, useCity } from "@/features";

import { RenderInput } from "./RenderInput";
import { RenderOption } from "./RenderOption";

export const Search: FC = () => {
  const { loading, options, setInputValue } = useCity();
  const router = useRouter();

  const changeHandler = (_event: SyntheticEvent<Element, Event>, newValue: FindCityResponse | null) => {
    if (!newValue) {
      return;
    }

    router.push(`/weather?city=${newValue!.address}`);
    setInputValue("");
  }

  return (
    <Autocomplete
      loading={loading}
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === "string" ? option : option.address)}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.address === value.address}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No locations"
      onChange={changeHandler}
      onInputChange={(_evt, newInputValue) => setInputValue(newInputValue)}
      renderInput={RenderInput}
      disablePortal={true}
      renderOption={RenderOption}
    />
  );
};
