import React from "react";
import { Tag } from "antd";

/* Shared */
import { User } from "../../types";

type Props = {
  user: User;
  onSelect: (userId: number) => void;
};

export function UserComponent({ user, onSelect }: Props) {
  return (
    <div onClick={() => onSelect(user.id)}>
      <Tag color={user.selected ? "#87d068" : "#2db7f5"} className="user-tag">
        {`${user.id} - ${user.name}`}
      </Tag>
    </div>
  );
}
