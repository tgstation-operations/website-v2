{
  description = "/tg/station website";

  inputs = {
    nixpkgs = {
      url = "github:NixOS/nixpkgs/nixos-unstable";
    };
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {self, nixpkgs, ...} @ inputs: let
      # System types to support.
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];
    # Helper function to generate an attrset '{ x86_64-linux = f "x86_64-linux"; ... }'.
    forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

    # Nixpkgs instantiated for supported system types.
    nixpkgsFor = forAllSystems (system: import nixpkgs {inherit system;});
  in {
    packages = forAllSystems (
      system: let
        pkgs = nixpkgsFor.${system};
      in {
        tgstation-website = pkgs.buildNpmPackage {
          pname = "tgstation.org-landingpage";
          version = "1.0.0";
          src = ./.;
          npmDepsHash = "sha256-IrkpMu5Wpr6xEFQGBtU7+QSqe8HFK/oUgES9tTpYJ5c="; # Update this with `nix run nixpkgs#prefetch-npm-deps -- package-lock.json`
        };
        meta = {
          description = "The landing page for /tg/station13";
          homepage = "https://github.com/tgstation-operations/website-v2";
        };
      }
    );
  };
}
