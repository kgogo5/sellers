import { useCallback, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { COLOR } from "../../../commons";
// import modalTypes from "../../elements/modals";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  zipcode: string;
  addressLine1: string;
  extraAddress: string;
  tel: number;
  bdayDay: number;
  sex: string;
}

const LoginWrap = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginInner = styled.form`
  margin: 0 auto;
  padding: 0;
  max-width: 560px;
  width: 100%;
  /* background-color: rgba(255, 255, 255, 0.2); */
  border-radius: 6px;
`;

const FormArea = styled.ul`
  & > li {
    display: grid;
    align-items: center;
    &.addButtonForm {
      grid-template-columns: 3fr 1fr;
    }
  }

  & > li + li {
    margin-top: 1rem;
  }

  & * {
    color: ${COLOR.text} !important;
    border-color: ${COLOR.text} !important;
  }
`;

const Buttons = styled(Button)`
  width: 100%;
  height: 100%;
  && {
    min-width: 128px;
    font-size: 1rem;
  }
`;

const LoginButtonArea = styled(Box)`
  & .MuiButton-label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const AddressButton = styled(Button)`
  && {
    margin-left: 1rem;
    height: 100%;
    line-height: 1.6;
  }
`;

const ErrorMessage = styled(Typography)`
  && {
    margin-top: 0.5rem;
    margin-bottom: -0.5rem;
    font-size: 13px;
    color: ${COLOR.error} !important;
    text-align: left;
  }
`;

const RadioGroupBox = styled(RadioGroup)`
  && {
    flex-direction: row;
  }
`;

const _ = ({ next }: any) => {
  const [addressDialog, setAddressDialog] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      sex: "??????",
    },
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  // const [dialog, setDialog] = useState<DialogInterface>({ open: false });

  // ????????? ???????????? ???????????? ?????? ??? ??? ??????
  const isValid = true;

  const addressDialogOpen = useCallback(() => {
    setAddressDialog(true);
  }, [setAddressDialog]);

  const addressDialogClose = useCallback(() => {
    setAddressDialog(false);
  }, [setAddressDialog]);

  // ????????? ?????? ??????
  const handleComplete = useCallback(
    (data: any) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }

      setValue("zipcode", data.zonecode);
      setValue("addressLine1", fullAddress);
      addressDialogClose();
    },
    [addressDialogClose, setValue]
  );

  // const dialogClose = useCallback(() => {
  //   setDialog({ open: false });
  // }, [setDialog]);

  // Alert ??????
  // const defaultAlert = useCallback(
  //   ({ title, message }) => {
  //     modalTypes.alertModal({
  //       open: dialog,
  //       title,
  //       message,
  //       confirmationText: "??????",
  //       fullWidth: true,
  //       maxWidth: "sm",
  //       closeAction: { dialogClose },
  //     });
  //   },
  //   [dialog, dialogClose]
  // );

  // const dialogOpen = useCallback(
  //   ({ title, message }) => {
  //     setDialog({ open: true });
  //     defaultAlert({ title, message });
  //   },
  //   [defaultAlert, setDialog]
  // );

  return (
    <LoginWrap>
      <LoginInner noValidate autoComplete="off" onSubmit={onSubmit}>
        <Dialog open={addressDialog} onClose={addressDialogClose}>
          <DaumPostcode
            onComplete={handleComplete}
            animation
            focusInput
            theme={{ searchBgColor: "#34495e", queryTextColor: "#fff" }}
          />
          <Button onClick={addressDialogClose}>Close</Button>
        </Dialog>

        <AddressButton
          variant="contained"
          color="primary"
          onClick={() => onSubmit()}
        >
          ??? ????????? ?????????
        </AddressButton>
        <Box mt={2}>
          <FormArea>
            <Box component="li">
              <Controller
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="?????????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="email"
                    required
                    autoFocus
                    fullWidth
                    {...field}
                  />
                )}
              />
              {errors.email && errors.email.type === "pattern" && (
                <ErrorMessage>????????? ????????? ?????? ????????????</ErrorMessage>
              )}
              {errors.email && errors.email.type === "required" && (
                <ErrorMessage>?????? ?????? ???????????????</ErrorMessage>
              )}
            </Box>
            <Box component="li">
              <Controller
                rules={{
                  required: { value: true, message: "?????? ?????? ???????????????" },
                  min: { value: 8, message: "??????????????? 8??? ??????" },
                }}
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="password"
                    type="password"
                    label="??????????????? ??????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="new-password"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </Box>
            <Box component="li">
              <Controller
                rules={{ required: true }}
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="confirmPassword"
                    type="password"
                    label="??????????????? ??????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="new-password"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
            </Box>
            <Box component="li">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="??????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="name"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>
            <Box component="li" className="addButtonForm">
              <Controller
                name="zipcode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="zipcode"
                    label="????????????"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled
                    {...field}
                  />
                )}
              />
              <AddressButton
                variant="contained"
                color="primary"
                onClick={addressDialogOpen}
              >
                ??????
              </AddressButton>
            </Box>
            <Box component="li">
              <Controller
                name="addressLine1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="address-line1"
                    label="??????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="address-line1"
                    fullWidth
                    disabled
                    {...field}
                  />
                )}
              />
            </Box>
            <Box component="li">
              <Controller
                name="extraAddress"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="extraAddress"
                    label="????????????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="street-address"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>
            <Box component="li">
              <Controller
                rules={{
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  minLength: 10,
                  maxLength: 11,
                }}
                name="tel"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="tel"
                    label="????????????"
                    variant="outlined"
                    color="primary"
                    // autoComplete="tel"
                    fullWidth
                    required
                    {...field}
                  />
                )}
              />
              {errors.tel && errors.tel.type === "required" && (
                <ErrorMessage>?????? ?????? ???????????????</ErrorMessage>
              )}
              {errors.tel &&
                (errors.tel.type === "minLength" ||
                  errors.tel.type === "maxLength") && (
                  <ErrorMessage>??????????????? ?????? ??????????????????.</ErrorMessage>
                )}
            </Box>
            <Box component="li">
              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <RadioGroupBox aria-label="??????" {...field}>
                      <FormControlLabel
                        value="??????"
                        control={<Radio color="primary" />}
                        label="??????"
                      />
                      <FormControlLabel
                        value="??????"
                        control={<Radio color="primary" />}
                        label="??????"
                      />
                    </RadioGroupBox>
                  </FormControl>
                )}
              />
            </Box>
            <Box component="li">
              <Controller
                rules={{ minLength: 8, maxLength: 8 }}
                name="bdayDay"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="bday-day"
                    label="???????????? ???) 20101224"
                    variant="outlined"
                    color="primary"
                    autoComplete="bday-day"
                    fullWidth
                    {...field}
                  />
                )}
              />
              {errors.bdayDay &&
                (errors.bdayDay.type === "minLength" ||
                  errors.bdayDay.type === "maxLength") && (
                  <ErrorMessage>
                    ???????????? ????????? ?????? ????????????. ???)20101224
                  </ErrorMessage>
                )}
            </Box>
            <LoginButtonArea
              mt={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Buttons
                variant="contained"
                color="primary"
                onClick={() => {
                  if (isValid) {
                    next();
                  } else {
                    onSubmit();
                  }
                }}
              >
                ??????
              </Buttons>
            </LoginButtonArea>
          </FormArea>
        </Box>
      </LoginInner>
    </LoginWrap>
  );
};

export default _;
