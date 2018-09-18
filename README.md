# Emprendedores
Proyecto de emprendedores

## Demo

[Demo](https://www.youtube.com/watch?v=UBhWD-oc8Jk)

## Instalacion

### Django

Crear un *virtual enviroment*
```console
virtualenv -p python3 emprendedoresEnv
```

Activar *Virtual enviroment*
```console
. emprendedoresEnv/bin/activate
```

Instalar django 1.11
```console
pip install django==1.11
```


Instalar dependencias
```console
pip install djangorestframework
pip install django-cors-headers
```

### Ionic

#### Build para android

```console
sudo apt-get install openjdk-8-jdk openjdk-8-jre
```

Instalar android studio

Agregar variables de entorno en '~/.bashrc'
```console
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=${PATH}:~/Android/Sdk/tools
export PATH=${PATH}:~/Android/Sdk/platform-tools
```
Actualizar ~/.bashrc
```console
source ~/.bashrc
```

Instalar gradle
```console
sudo apt-get install gradle
```

Compilar
```
ionic cordova build android
```

## Autores

* Alberto Ochoa
* Bryan Quiroz
