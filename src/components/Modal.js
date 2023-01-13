import styled from "styled-components";
import Modal from "styled-react-modal";
import { Loader } from "./Loader";

export function GenericModal({ close, open, loading, action, phrase, word }) {
  let subtitle;

  return (
    <StyledModal
      onBackgroundClick={close}
      isOpen={open}
      onRequestClose={close}
      contentLabel="Modal"
      opacity={1}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <ContentModal ref={(_subtitle) => (subtitle = _subtitle)}>
            
          </ContentModal>
          <div>
            <ButtonModalNo onClick={close}>No, go back</ButtonModalNo>
            <ButtonModalYes onClick={action}>Yes, {word} it</ButtonModalYes>
          </div>
        </>
      )}
    </StyledModal>
  );
}

const StyledModal = Modal.styled`
  width: 597px;
  height: 262px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333333;
  border-radius: 50px;
`;

const ContentModal = styled.h1`
  width: 338px;
  margin-bottom: 30px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
`;

const ButtonModalNo = styled.button`
  cursor: pointer;
  width: 134px;
  height: 37px;
  border: none;
  margin-right: 15px;
  background: #ffffff;
  border-radius: 5px;
  color: #1877f2;
`;

const ButtonModalYes = styled.button`
  width: 134px;
  height: 37px;
  border: none;
  background: #1877f2;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
`;
