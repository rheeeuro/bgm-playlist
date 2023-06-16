import tw from "tailwind-styled-components";

function Footer() {
  return (
    <Container>
      <Text>
        {"Copyright"} &copy; {`${new Date().getFullYear()} `}
        <Link href="https://github.com/rheeeuro/bgm-playlist">
          {"rheeeuro"}
        </Link>
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
text-slate-50/40
`;

const Link = tw.a``;

export default Footer;
