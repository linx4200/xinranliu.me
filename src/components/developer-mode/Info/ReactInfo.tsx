import { data } from "@/data/dev-mode-react-components";

export type Props = {
  name: string;
  propList?: { key: string; value: string }[];
}

export const ReactInfo = ({ name, propList }: Props) => {
  return (
    <>
      <div>
        <span className="text-zinc-400">&lt;</span>
        <span className="font-bold text-rose-700/90">{name}</span>
        {!propList || propList.length === 0 && <span className="text-zinc-400">&#47;&gt;</span>}
      </div>
      <div className="text-xs/normal">
        {propList?.map(({ key, value }) =>
          <div className="flex" key={key}>
            <span className="indent-4 text-sky-300">{key}</span>
            <span className="text-zinc-400">=</span>
            <span className="max-w-[300px] text-ellipsis line-clamp-1 text-amber-200/90">{`"${value}`}</span>
            <span className="text-amber-200/90">{`"`}</span>
          </div>
        )}
      </div>
      {propList && propList.length > 0 && <div className="text-zinc-400">&#47;&gt;</div>}
    </>
  )
}

export const getInfo: (target: HTMLElement | null) => (undefined | { props: Props | undefined, ele: HTMLElement }) = (target) => {

  if (typeof data === 'undefined') return;
  if (target === null || target.tagName === 'BODY' || target.tagName === 'HTML') return;

  const componentNameAttrs = Array.from(target.attributes).filter(attr => attr.name === 'data-dev-mode-react-name');
  if (!componentNameAttrs.length) {
    return getInfo(target.parentElement);
  };

  const componentName = componentNameAttrs[0].value;

  const componentInfo = data[componentName as keyof typeof data];

  return {
    props: componentInfo,
    ele: target
  };
}
