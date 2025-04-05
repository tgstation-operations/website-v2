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
    in
    {
      packages = forAllSystems ({ pkgs }: {
        default = pkgs.buildYarnPackage {
          name = "tgstation-website";
          buildInputs = with pkgs; [
            nodejs_22
          ];
          src = ./.;
          npmDepsHash = "sha256-+YrFWZEQvBfrlUOB0EwlN3sNBgqnc78HD7KNPJP086Q=";
          npmBuild = "npm run build";
          installPhase = ''
            mkdir $out
            cp -r _site/* $out
          '';
        };
      });
    };
}
