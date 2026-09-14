import React from "react";
import {
  Minimize2,
  RefreshCw,
  Files,
  Scissors,
  Sparkles,
  BookOpen,
  FileUp,
  ImageDown,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Upload,
  Download,
  Trash2,
  CreditCard,
  QrCode,
  Lock,
  Search,
  ChevronRight,
  Menu,
  X,
  User,
  Layers,
  Sparkle,
  History,
  TrendingUp,
  Activity,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  LucideProps,
} from "lucide-react";

interface IconResolverProps extends LucideProps {
  name: string;
}

export function IconResolver({ name, ...props }: IconResolverProps) {
  switch (name) {
    case "Minimize2":
      return <Minimize2 {...props} />;
    case "RefreshCw":
      return <RefreshCw {...props} />;
    case "Files":
      return <Files {...props} />;
    case "Scissors":
      return <Scissors {...props} />;
    case "Sparkles":
      return <Sparkles {...props} />;
    case "BookOpen":
      return <BookOpen {...props} />;
    case "FileUp":
      return <FileUp {...props} />;
    case "ImageDown":
      return <ImageDown {...props} />;
    case "Image":
      return <ImageIcon {...props} />;
    case "FileText":
      return <FileText {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "Zap":
      return <Zap {...props} />;
    case "CheckCircle2":
      return <CheckCircle2 {...props} />;
    case "ArrowRight":
      return <ArrowRight {...props} />;
    case "Sliders":
      return <Sliders {...props} />;
    case "Upload":
      return <Upload {...props} />;
    case "Download":
      return <Download {...props} />;
    case "Trash2":
      return <Trash2 {...props} />;
    case "CreditCard":
      return <CreditCard {...props} />;
    case "QrCode":
      return <QrCode {...props} />;
    case "Lock":
      return <Lock {...props} />;
    case "Search":
      return <Search {...props} />;
    case "ChevronRight":
      return <ChevronRight {...props} />;
    case "Menu":
      return <Menu {...props} />;
    case "X":
      return <X {...props} />;
    case "User":
      return <User {...props} />;
    case "Layers":
      return <Layers {...props} />;
    case "History":
      return <History {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Activity":
      return <Activity {...props} />;
    case "AlertCircle":
      return <AlertCircle {...props} />;
    case "HelpCircle":
      return <HelpCircle {...props} />;
    case "ExternalLink":
      return <ExternalLink {...props} />;
    default:
      return <Sparkle {...props} />;
  }
}
