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
        tgstation-website-node-modules = nixpkgs.legacyPackages.${system}.mkYarnPackage {
          name = "tgstation-website-node-modules";
          src = ./.;
        };
      });
    in
    {
      packages = forAllSystems ({ pkgs, tgstation-website-node-modules }: {
        default = pkgs.stdenv.mkDerivation {
          name = "tgstation-website";
          buildInputs = [
            pkgs.nodejs_22
            tgstation-website-node-modules
          ];
          buildPhase = ''
            ls -al ${tgstation-website-node-modules}
            ls -al ${tgstation-website-node-modules}/libexec
            ln -s ${tgstation-website-node-modules}/libexec/website-v2/node_modules node_modules
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
