import { useContext, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import useWindowDimensions from "../../../components/GetWindowDimensions";
import { UserImage } from "../../../components/UserImage";
import { AuthContext } from "../../../contexts/auth";
import { Api } from "../../../services/api";

export default function PostWriter({ setCleanup }) {
  const { width } = useWindowDimensions();
  const auth = useContext(AuthContext);
  const [submiting, setSubmiting] = useState(false);
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");

  function onFinish(e) {
    setSubmiting(true);
    e.preventDefault();

    const body = {
      link,
      content,
    };

    Api.post("/add-post", body)
      .then(() => {
        setLink("");
        setContent("");
        setSubmiting(false);
        setCleanup(true);
      })
      .catch(() => {
        swal("", "Ouve um erro ao publicar seu link", "error");
        setSubmiting(false);
      });
  }

  return (
    <PostWriterWrapper>
      {width > 937 && <UserImage src={auth.user?.user?.pictureUrl} />}
      <PostForm onSubmit={onFinish}>
        <PostWriterTitle>What are you going to share today?</PostWriterTitle>
        <InputLink
          placeholder="http://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={submiting}
        />
        <InputContent
          placeholder="Awesome article about #javascript"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submiting}
        />
        <Button disabled={submiting}>
          {submiting ? "Publishing..." : "Publish"}
        </Button>
      </PostForm>
    </PostWriterWrapper>
  );
}

const PostWriterWrapper = styled.div`
  background-color: #fff;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  gap: 18px;

  @media (max-width: 937px) {
    border-radius: 0px;
  }
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
`;

const PostWriterTitle = styled.h1`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  width: 100%;
`;

const InputLink = styled.input`
  background: #efefef;
  border-radius: 5px;
  width: 100%;
  border: none;
  outline: none;
  height: 30px;
  border-radius: 5px;
  padding: 12px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;

  &::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
`;

const InputContent = styled.textarea`
  background: #efefef;
  border-radius: 5px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 12px;
  min-height: 66px;
  resize: vertical;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;

  &::placeholder {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
`;

const Button = styled.button`
  background: #1877f2;
  border-radius: 5px;
  width: 112px;
  height: 31px;
  outline: none;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  &:disabled {
    background-color: #cccccc;
    color: #666666;
  }
`;
