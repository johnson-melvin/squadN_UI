
import React from "react";
import AvailabilityPostForm from "./AvailabilityPostForm";

type Props = {
  sportsList: string[];
  onPost: (data: any) => void;
};

/**
 * Renders the post submission form always visible right after the left nav,
 * starting 2px from the sidebar end, with all submit options on one line.
 * Keeps the original gradient/dark theme.
 */
const CollapsiblePostForm = ({ sportsList, onPost }: Props) => {
  // Sidebar is 170px; add only 2px margin to start form very close to sidebar.
  return (
    <div
      className="relative z-10 w-full"
      style={{
        marginLeft: "0px",
        maxWidth: "none",
      }}
    >
      <AvailabilityPostForm
        sportsList={sportsList}
        onPost={onPost}
        compact={true}
        onMessageFocus={() => {}}
        oneLiner={true}
      />
    </div>
  );
};

export default CollapsiblePostForm;
