{
  description = "tgstation website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = nixpkgs.legacyPackages.${system};
      });
      node-modules = pkgs.mkYarnPackage {
        name = "tgstation-website-node-modules"
        src = ./.;
      };
    in
    {
      packages = forAllSystems ({ pkgs }: {
        default = pkgs.stdenv.mkDerivation {
          name = "tgstation-website";
          buildInputs = with pkgs; [
            nodejs_22
            node-modules
          ];
          buildPhase = ''
            ls -al ${node-modules}
            ls -al ${node-modules}/libexec
            ln -s ${node-modules}/libexec/website-v2/node_modules node_modules
            ${pkgs.yarn}/bin/yarn build
          '';
          src = ./.;
          installPhase = ''
            mkdir $out
            cp -r _site/* $out
          '';
        };
      });
    };
}
