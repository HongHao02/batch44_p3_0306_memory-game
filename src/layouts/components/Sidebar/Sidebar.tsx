import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view";

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: "Favorites",
    label: "Favorites",
    children: [
      { id: "f_ib", label: "Inbox" },
      { id: "f_si", label: "Sent Items" },
      { id: "f_d", label: "Drafts" },
    ],
  },
  {
    id: "Folders",
    label: "Folders",
    children: [
      { id: "fol_ib", label: "Inbox" },
      { id: "fol_si", label: "Sent Items" },
      { id: "fol_d", label: "Drafts" },
    ],
  },
];

export default function Sidebar() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <RichTreeView items={MUI_X_PRODUCTS} />
    </Box>
  );
}
