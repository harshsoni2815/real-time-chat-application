import React from "react";
import {  VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import {
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  /* 
  const toast = useToast(); */
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /*const history = useHistory();
  const { setUser } = ChatState(); */
  //"http://127.0.0.1:3000/api/user/login"
    async function submitHandler() {
      setLoading(true);
     if(email=="" || password==""){
      toast({
        title: "enter complete field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
     }

     console.log( email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

     const {data}= await axios.post("http://127.0.0.1:3000/api/user/login",{
        email,
        password,
      },
      config);

  
      localStorage.setItem("userInfo", JSON.stringify(data));

      toast({
        title: "logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
    }
    catch(error){
       console.log(error);
       toast({
        title: "wrong password",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
    }
  }

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel fontFamily="Work sans">Enter your email</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel fontFamily="Work sans">Enter your password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
