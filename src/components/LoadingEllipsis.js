export default function LoadingEllipsis({ text }) {
    return <div class="flex items-baseline space-x-2">
        {text && <small class="text-gray-400 text-xs">{text}</small>}
        <div class="flex items-center space-x-1">
            <div class="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
            <div class="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
            <div class="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
        </div>
    </div>;
}