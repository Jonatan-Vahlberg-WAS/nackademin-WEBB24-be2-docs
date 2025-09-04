import { cn } from "../../../utils/cn";

const YoutubeEmbed = ({ videoId, description, className }) => {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <div className="w-full h-80 rounded-md overflow-hidden bg-black">
        <iframe
          className={cn("w-full h-full", className)}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {description && (
        <p className="mt-4 text-base text-center text-gray-700">
          {description}
        </p>
      )}
    </div>
  );
};

export default YoutubeEmbed;
