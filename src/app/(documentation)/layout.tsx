export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Leftnav>This is the sidebar</Leftnav>
      <Main>{children}</Main>
      <Rightnav></Rightnav>
    </Container>
  );
}
