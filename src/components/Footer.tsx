import tw from "tailwind-styled-components";

function Footer() {
  return (
    <Container>
      <Text>
        {"Copyright"} &copy; {`${new Date().getFullYear()} rheeeuro`}{" "}
      </Text>
    </Container>
  );
}

const Container = tw.div`
fixed
bottom-3
right-5
`;

const Text = tw.h1`
font-thin
text-sm
text-slate-900/40
`;

export default Footer;
