import styled from "styled-components";
import useWindowDimensions from "../../../components/GetWindowDimensions";
import { UserImage } from "../../../components/UserImage";

export default function PostWriter({
  setLink,
  link,
  content,
  setContent,
  onFinish,
  loading,
}) {
  const { width } = useWindowDimensions();

  return (
    <PostWriterWrapper>
      {width > 937 && (
        <UserImage src="https://pop.proddigital.com.br/wp-content/uploads/sites/8/2022/10/2f24e280b7c0c94000d91133fe1552cc1665499260-main.png" />
      )}
      <PostForm onSubmit={onFinish}>
        <PostWriterTitle>What are you going to share today?</PostWriterTitle>
        <InputLink
          placeholder="http://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={loading}
        />
        <InputContent
          placeholder="Awesome article about #javascript"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <Button disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
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
