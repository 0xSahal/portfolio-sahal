import {
  Globe,
  AppWindow,
  Handshake,
  Target,
  Zap,
  Code2,
  Layers,
  Cpu,
  type LucideProps,
} from 'lucide-react';

const map = { Globe, AppWindow, Handshake, Target, Zap, Code2, Layers, Cpu } as const;

export type IconName = keyof typeof map;

export default function DynIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = map[name as IconName] ?? Globe;
  return <Icon {...props} />;
}
