# Copyright(c) Meta Platforms, Inc. and affiliates.

import errno
import os
import shutil
import subprocess
import sys

"""Script to upload Aria app to S3 bucket
Usage: python3 aws_deploy.py

Assumptions:
1) You have the aws cli installed, and it can get access to credentials
1a) This can be anything specified here: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
1b) For github actions, you should have AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY set as secrets, with AWS_DEFAULT_REGION in the environment
2) You have installed python 3.
3) You are running from within the root directory of the repo (and therefore need to look inside the 'site' folder to start work)
4) Environment variables NODE_VERSION, DISTDIR, and IDENTIFIER are defined
See .github/workflows/deploy.yml 'Setup Vars' step for how those env vars are created.
"""

def deploy():
    os.chdir('site')
    print("Calculating build hash and distdir...")
    output = subprocess.run(
        ["git", "rev-parse", "--short", "HEAD"], capture_output=True
    )
    hash = output.stdout.decode("utf-8").strip()
    print("\ngithash: " + hash)
    identifier = os.environ["IDENTIFIER"]
    distdir = os.environ["DISTDIR"]
    print("\ndistdir: " + distdir)
    # Blow away the previous dir, if any.
    if os.path.exists(distdir):
        print(f"Previous distribution dir {distdir} found, removing.")
        shutil.rmtree(distdir)
    print(f"\nCreating dist folder {distdir}")
    try:
        os.mkdir(distdir)
    except OSError as err:
        if err.errno == errno.EEXIST:
            print(f"{distdir} already exists")
        elif err.errno == errno.EACCES:
            print(f"{distdir} permission denied")
        raise
    print("\nCopying dist folder")
    subprocess.check_call(args=f"cp -a ./dist/* {distdir}", shell=True)
    print("\nPrepping index.html with correct asset, css, and javascript paths")
    index = "dist/index.html"
    newindex = os.path.join(distdir, "index.html")
    with open(index, "r") as input:
        with open(newindex, "w+") as output:
            # Massage the paths appropriately
            for s in input:
                s = (
                    s.replace("/assets/", f"/aria/{distdir}/assets/")
                    s.replace("/favicon.png", f"/aria/{distdir}/favicon.png")
                )
                output.write(s)

if __name__ == "__main__":
    deploy()
