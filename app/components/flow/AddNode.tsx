type AddNodeProps = {
  addNode: () => void;
};

const AddNode = ({ addNode }: AddNodeProps) => {
  return (
    <button
      onClick={addNode}
      className="absolute top-4 left-4 rounded bg-blue-500 px-4 py-2 text-white cursor-pointer">
      Add Node
    </button>
  );
};

export default AddNode;
