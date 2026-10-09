"use client";

import MenuRow from "@/components/Menu/MenuRow";

export default function MenuGroup({ items, groupKey }) {
  if (!items?.length) {
    return (
      <p className="text-desc font-body text-sm">
        Nothing listed for this category right now — ask in store.
      </p>
    );
  }

  return (
    <div key={groupKey} className="menu-group" data-menu-group={groupKey}>
      {items.map((item, index) => (
        <MenuRow key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
