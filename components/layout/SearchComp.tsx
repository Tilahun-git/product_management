import React from "react";
import { Camera, Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchComp = () => {
  return (
    <div>
      <Search />
      <Button className="bg-blue-50">
        <Camera />
      </Button>
    </div>
  );
};

export default Search;
