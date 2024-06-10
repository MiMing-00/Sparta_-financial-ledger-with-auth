import React from "react";
import styled from "styled-components";

const FooterSection = styled.section`
  width: 100%;
  max-width: 1280px;
  height: auto;
  background-color: darkgray;
  color: white;
  padding: 1rem 0px;
  display: flex;
  flex-direction: row;
  margin: 0 auto 1rem 0;
  border: none;
  border-radius: 0 0 15px 15px;

  span {
    margin: 0px 1rem;
    &:hover {
      font-weight: bold;
    }
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <span>footer</span>
    </FooterSection>
  );
};

export default Footer;
