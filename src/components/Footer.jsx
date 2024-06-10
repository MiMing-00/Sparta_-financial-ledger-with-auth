import React from "react";
import styled from "styled-components";

const FooterSection = styled.section`
  width: 90%;
  height: auto;
  background-color: darkgray;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const Footer = () => {
  return <FooterSection>Footer</FooterSection>;
};

export default Footer;
