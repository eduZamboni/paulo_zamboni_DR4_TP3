import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface CustomListItem {
  id: number;
  title: string;
  notes: string;
}

interface CustomListProps {
  items: CustomListItem[];
  onEdit: (id: number) => void;
}

const CustomList: React.FC<CustomListProps> = ({ items, onEdit }) => {
  if (items.length === 0) {
    return <p>Não há itens cadastrados.</p>;
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onEdit(item.id)}>
              <Edit />
            </IconButton>
          }
        >
          <ListItemText primary={item.title} secondary={item.notes} />
        </ListItem>
      ))}
    </List>
  );
};

export default CustomList;