{
  description = "tgstation-website";

  inputs = { };

  outputs =
    { self, ... }:
    {
      nixosModules = {
        default =
          { ... }:
          {
            imports = [ ./tgstation-website.nix ];
          };
      };
    };
}
