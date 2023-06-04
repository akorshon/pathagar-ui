#!/bin/zsh

file=deployment/deployment.yml
buildApplication(){
    showLabel  "building angular application"
    ng build --configuration production
}

changeDeploymentVersion(){
    showLabel  "Creating new deployment version"

    # Change version
    currentVersion=$(sed -n -e 's/^.*pathagar-ui:v//p' $file)
    echo "current version ${currentVersion}"

    nextVersion=$((currentVersion + 1))
    echo "next version ${nextVersion}"

    # Change image on the deployment.yml file
    sed -i '' "s/pathagar-ui:v$currentVersion.*/pathagar-ui:v$nextVersion/g" $file
    image=$(grep -o 'eu.gcr.io/marufh/pathagar-ui.*' $file)
}

buildDockerImage(){
    showLabel "building docker image:$image"
    docker buildx build --platform linux/amd64 -t $image --push .
}

apply(){
  showLabel "Deploy image to the server : $image"
  kubectl apply -f $file
}


deploy(){
    buildApplication
    changeDeploymentVersion
    buildDockerImage
    apply
}


showLabel(){
  echo "
********************************************************************************
  $1
*********************************************************************************
";
}


option="${1}"
case ${option} in
  "deploy") deploy ;;
esac

