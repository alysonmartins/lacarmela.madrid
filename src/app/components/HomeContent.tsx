import ElClub from "./home/ElClub";
import Grupos from "./home/Grupos";
import RightColumn from "./home/RightColumn";
import VIP from "./home/VIP";

export default function HomeContent() {
  return (
    <div className="max-w-7xl mx-auto p-3 sm:px-0">
      <div className="grid grid-cols-6 gap-6 mx-2">
        <div className="col-span-4 max-md:col-span-6">
          {/* COLUMN LEFT  */}
          <div className="space-y-4">
            <ElClub />
            <VIP />
            <Grupos />
          </div>
        </div>

        {/* COLUMN RIGHT */}
        <div className="col-span-2 max-md:col-span-6">
          <div className="space-y-4">
            <RightColumn />
          </div>
        </div>
      </div>
    </div>
  );
}
