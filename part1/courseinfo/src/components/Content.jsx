import Part from "./Part";

function Content(params) {
  return (
    <>
      <Part part={params.part1} exercises={params.exercises1} />
      <Part part={params.part2} exercises={params.exercises2} />
      <Part part={params.part3} exercises={params.exercises3} />
    </>
  );
}
export default Content;